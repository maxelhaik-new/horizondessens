import{jsx as _jsx}from"react/jsx-runtime";import{addPropertyControls,ControlType}from"framer";/**
 * @framerIntrinsicWidth 8
 * @framerIntrinsicHeight 8
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerDisableUnlink
 */export default function Advanced_Scroll_Pro(props){const{gradientThumb,thumbColor,thumbHoverColor,gradientStart,gradientEnd,hoverStart,hoverEnd,radius,trackColor,trackRadius,verticalWidth,horizontalHeight,transparentTrack,hideVertical,hideHorizontal}=props;const verticalThumb=gradientThumb?`linear-gradient(180deg, ${gradientStart}, ${gradientEnd})`:thumbColor;const verticalHover=gradientThumb?`linear-gradient(180deg, ${hoverStart}, ${hoverEnd})`:thumbHoverColor;const horizontalThumb=gradientThumb?`linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`:thumbColor;const horizontalHover=gradientThumb?`linear-gradient(90deg, ${hoverStart}, ${hoverEnd})`:thumbHoverColor;const trackBackground=transparentTrack?"transparent":trackColor;const css=`
::-webkit-scrollbar {
  width: ${hideVertical?0:verticalWidth}px;
  height: ${hideHorizontal?0:horizontalHeight}px;
}

::-webkit-scrollbar-track {
  background: ${trackBackground};
  border-radius: ${trackRadius}px;
}

::-webkit-scrollbar-thumb {
  border-radius: ${radius}px;
}

/* Vertical scrollbar */
::-webkit-scrollbar-thumb:vertical {
  background: ${verticalThumb};
}

::-webkit-scrollbar-thumb:vertical:hover {
  background: ${verticalHover};
}

/* Horizontal scrollbar */
::-webkit-scrollbar-thumb:horizontal {
  background: ${horizontalThumb};
}

::-webkit-scrollbar-thumb:horizontal:hover {
  background: ${horizontalHover};
}
`;return /*#__PURE__*/_jsx("style",{children:css});}addPropertyControls(Advanced_Scroll_Pro,{gradientThumb:{type:ControlType.Boolean,title:"Gradient",defaultValue:false},thumbColor:{type:ControlType.Color,title:"Thumb",defaultValue:"#2DD4BF",hidden:props=>props.gradientThumb},thumbHoverColor:{type:ControlType.Color,title:"Hover",defaultValue:"#06B6D4",hidden:props=>props.gradientThumb},gradientStart:{type:ControlType.Color,title:"Start",defaultValue:"#2DD4BF",hidden:props=>!props.gradientThumb},gradientEnd:{type:ControlType.Color,title:"End",defaultValue:"#38BDF8",hidden:props=>!props.gradientThumb},hoverStart:{type:ControlType.Color,title:"Hover Start",defaultValue:"#60A5FA",hidden:props=>!props.gradientThumb},hoverEnd:{type:ControlType.Color,title:"Hover End",defaultValue:"#6366F1",hidden:props=>!props.gradientThumb},radius:{type:ControlType.Number,title:"Radius",min:0,max:40,step:1,defaultValue:8},transparentTrack:{type:ControlType.Boolean,title:"Transparent",defaultValue:false},trackColor:{type:ControlType.Color,title:"Track",defaultValue:"#ffffff",hidden:props=>props.transparentTrack},trackRadius:{type:ControlType.Number,title:"Track Radius",min:0,max:40,step:1,defaultValue:0},hideVertical:{type:ControlType.Boolean,title:"Hide Vertical",defaultValue:false},hideHorizontal:{type:ControlType.Boolean,title:"Hide Horizontal",defaultValue:false},verticalWidth:{type:ControlType.Number,title:"V Width",min:1,max:40,step:1,defaultValue:12,hidden:props=>props.hideVertical},horizontalHeight:{type:ControlType.Number,title:"H Height",description:"Crafted by [Shouvik Biswas](https://dub.sh/framer-components)",min:1,max:40,step:1,defaultValue:12,hidden:props=>props.hideHorizontal}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"Advanced_Scroll_Pro","slots":[],"annotations":{"framerContractVersion":"1","framerDisableUnlink":"","framerSupportedLayoutWidth":"fixed","framerSupportedLayoutHeight":"fixed","framerIntrinsicWidth":"8","framerIntrinsicHeight":"8"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Advanced_Scroll_Pro.map