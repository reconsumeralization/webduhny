// Simple page
const simplePage = {
  state: {},
  elements: [
    {
      type: 'Webiny/Element',
      id: '4ETOAnHNei7',
      component: {
        // Points to an actual React component, registered with `Webiny.registerComponent()`.
        name: 'Webiny/Text',
        options: {
          text: 'Hello!',
        },
      },
      // Styles are applied to the DOM element which holds the custom React component.
      styles: {
        // large | medium | small - based on screen size / breakpoints
        large: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          flexShrink: 0,
          boxSizing: 'border-box',
          marginTop: '20px',
          lineHeight: 'normal',
          height: 'auto',
        },
      },
    },
  ],
};
