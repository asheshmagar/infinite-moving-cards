import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import React from "react";

export default function Save(
	props: BlockSaveProps<{
		animationSpeed: number;
		animationDirection: string;
		cardWidth: number;
		cardWidthMd: number;
		pauseOnHover: boolean;
		className: string;
	}>,
) {
	const innerBlockProps = useInnerBlocksProps.save({
		className: "infinite-moving-cards__inner imc-animate",
	});

	return (
		<div
			{...useBlockProps.save({
				className: `infinite-moving-cards ${
					props.attributes.pauseOnHover ? " imc-hover-paused" : ""
				}`,
				style: {
					"--imc-card-width": `${props.attributes.cardWidth}px`,
					"--imc-card-width-md": `${props.attributes.cardWidthMd}px`,
					"--imc-animation-duration": `${props.attributes.animationSpeed}s`,
					"--imc-animation-direction": props.attributes.animationDirection,
				} as React.CSSProperties,
			})}
		>
			<div {...innerBlockProps} />
		</div>
	);
}
