export const createScssVariablesTemplate = () => `
// Small tablets and large smartphones (landscape view)
$screen-sm-min: 576px;

// Small tablets (portrait view)
$screen-md-min: 768px;

// Tablets and small desktops
$screen-lg-min: 992px;

// Large tablets and desktops
$screen-xl-min: 1200px;

// 2K and higher screens
$screen-xxl-min: 1800px;

// Small devices
@mixin sm {
  @media (min-width: #{$screen-sm-min}) {
    @content;
  }
}

// Medium devices
@mixin md {
  @media (min-width: #{$screen-md-min}) {
    @content;
  }
}

// Large devices
@mixin lg {
  @media (min-width: #{$screen-lg-min}) {
    @content;
  }
}

// Extra large devices
@mixin xl {
  @media (min-width: #{$screen-xl-min}) {
    @content;
  }
}

// Extra extra large devices
@mixin xxl {
  @media (min-width: #{$screen-xxl-min}) {
    @content;
  }
}

// Custom devices
@mixin rwd($screen) {
  @media (min-width: $screen+'px') {
    @content;
  }
}

@mixin flex($align, $justify, $flex-flow) {
  display: flex;
  flex-flow: $flex-flow;
  align-items: $align;
  justify-content: $justify;
}
`;
