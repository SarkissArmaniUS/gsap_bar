import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

const Hero = () => {
	const rootRef = useRef(null);
	const videoRef = useRef(null);

	useGSAP(
		() => {
			const video = videoRef.current;
			const mm = gsap.matchMedia();

			mm.add(
				{
					isMobile: "(max-width: 767px)",
					reduce: "(prefers-reduced-motion: reduce)",
				},
				(context) => {
					const { isMobile, reduce } = context.conditions;

					// Без анімацій для тих, хто їх вимкнув: показуємо статичний hero
					if (reduce) return;

					// 1. Інтро-анімація тексту. autoSplit перераховує розбиття
					// після завантаження шрифтів і при ресайзі.
					SplitText.create(".hero-title", {
						type: "chars",
						charsClass: "text-gradient",
						autoSplit: true,
						onSplit: (self) =>
							gsap.from(self.chars, {
								yPercent: 100,
								duration: 1.8,
								ease: "expo.out",
								stagger: 0.06,
							}),
					});

					SplitText.create(".hero-subtitle", {
						type: "lines",
						autoSplit: true,
						onSplit: (self) =>
							gsap.from(self.lines, {
								opacity: 0,
								yPercent: 100,
								duration: 1.8,
								ease: "expo.out",
								stagger: 0.06,
								delay: 1,
							}),
					});

					// 2. Паралакс листків
					gsap
						.timeline({
							scrollTrigger: {
								trigger: "#hero",
								start: "top top",
								end: "bottom top",
								scrub: true,
							},
						})
						.to(".right-leaf", { y: 200 }, 0)
						.to(".left-leaf", { y: -200 }, 0);

					// 3. Скраб відео. Працює і коли метадані вже завантажені,
					// і коли ще ні.
					const initVideoScrub = () => {
						gsap.to(video, {
							currentTime: video.duration,
							ease: "none",
							scrollTrigger: {
								trigger: video,
								start: isMobile ? "top 50%" : "center 60%",
								end: isMobile ? "120% top" : "bottom top",
								scrub: true,
								pin: true,
								invalidateOnRefresh: true,
							},
						});
					};

					if (video.readyState >= 1) {
						initVideoScrub();
					} else {
						video.addEventListener("loadedmetadata", initVideoScrub, { once: true });
					}

					// cleanup при ресайзі через matchMedia і при розмонтуванні
					return () => video.removeEventListener("loadedmetadata", initVideoScrub);
				}
			);
		},
		{ scope: rootRef }
	);

	return (
		<div ref={rootRef}>
			<section id="hero" className="noisy">
				<h1 className="hero-title title">MOJITO</h1>

				<img
					src="/images/hero-left-leaf.png"
					alt=""
					aria-hidden="true"
					className="left-leaf"
				/>
				<img
					src="/images/hero-right-leaf.png"
					alt=""
					aria-hidden="true"
					className="right-leaf"
				/>

				<div className="body">
					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="hero-subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>

						<div className="view-cocktails">
							<p className="hero-subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.
							</p>
							<a href="#cocktails">View cocktails</a>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
					poster="/images/hero-poster.webp"
					aria-hidden="true"
					src="/videos/output.mp4"
				/>
			</div>
		</div>
	);
};

export default Hero;