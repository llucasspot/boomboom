export enum StackAnimationTypes {
  // use the platform default animation
  DEFAULT = 'default',
  // fade screen in or out
  FADE = 'fade',
  // fade the new screen from bottom
  FADE_FROM_BOTTOM = 'fade_from_bottom',
  // flip the screen, requires stackPresentation: "modal" (iOS only)
  FLIP = 'flip',
  // default animation, but without shadow and native header transition (iOS only, uses default
  // animation on Android)
  SIMPLE_PUSH = 'simple_push',
  // slide in the new screen from bottom
  SLIDE_FROM_BOTTOM = 'slide_from_bottom',
  // slide in the new screen from right (Android only, uses default animation on iOS)
  SLIDE_FROM_RIGHT = 'slide_from_right',
  // slide in the new screen from left (Android only, uses default animation on iOS)
  SLIDE_FROM_LEFT = 'slide_from_left',
  // don't animate the screen
  NONE = 'none',
}
