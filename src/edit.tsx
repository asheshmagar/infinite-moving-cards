import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import React from "react";
import "./editor.scss";
import { BlockEditProps, TemplateArray } from "@wordpress/blocks";
import {
	ButtonGroup,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Button,
	BaseControl,
} from "@wordpress/components";

const ALLOWED_BLOCKS = ["core/group"];

const TEMPLATE = [
	[
		"core/group",
		{
			layout: {
				type: "constrained",
			},
		},
	],
	[
		"core/group",
		{
			layout: {
				type: "constrained",
			},
		},
	],
	[
		"core/group",
		{
			layout: {
				type: "constrained",
			},
		},
	],
] as TemplateArray;

export default function Edit(
	props: BlockEditProps<{
		animationSpeed: number;
		animationDirection: string;
		cardWidth: number;
		cardWidthMd: number;
		pauseOnHover: boolean;
	}>,
) {
	const [isPlaying, setIsPlaying] = React.useState(false);
	const innerBlockProps = useInnerBlocksProps(
		{
			className: `infinite-moving-cards__inner ${
				isPlaying ? " imc-animate" : ""
			}`,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender,
		},
	);
	return (
		<>
			<InspectorControls>
				<PanelBody
					initialOpen
					title={__("Infinite Moving Cards", "infinite-moving-cards")}
				>
					<BaseControl>
						<ButtonGroup>
							<Button onClick={() => setIsPlaying(true)} isPressed={isPlaying}>
								{__("Play", "infinite-moving-cards")}
							</Button>
							<Button
								onClick={() => setIsPlaying(false)}
								isPressed={!isPlaying}
							>
								{__("Stop", "infinite-moving-cards")}
							</Button>
						</ButtonGroup>
					</BaseControl>
					<ToggleControl
						label={__("Pause on hover", "infinite-moving-cards")}
						checked={props.attributes.pauseOnHover}
						onChange={(value) => props.setAttributes({ pauseOnHover: value })}
					/>
					<RangeControl
						label={__("Animation speed (seconds)", "infinite-moving-cards")}
						min={10}
						max={100}
						value={props.attributes.animationSpeed}
						onChange={(value) => props.setAttributes({ animationSpeed: value })}
					/>
					<SelectControl
						label={__("Animation direction", "infinite-moving-cards")}
						options={[
							{
								label: __("Forwards", "infinite-moving-cards"),
								value: "forwards",
							},
							{
								label: __("Reverse", "infinite-moving-cards"),
								value: "reverse",
							},
						]}
						value={props.attributes.animationDirection}
						onChange={(value) =>
							props.setAttributes({ animationDirection: value })
						}
					/>
					<RangeControl
						label={__("Card width (px)", "infinite-moving-cards")}
						max={1000}
						value={props.attributes.cardWidth}
						onChange={(value) => props.setAttributes({ cardWidth: value })}
					/>
					<RangeControl
						label={__("Card width (px) (>767px)", "infinite-moving-cards")}
						max={1000}
						value={props.attributes.cardWidthMd}
						onChange={(value) => props.setAttributes({ cardWidthMd: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `infinite-moving-cards${
						isPlaying
							? " infinite-moving-cards--playing"
							: " infinite-moving-cards--stopped"
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
		</>
	);
}
