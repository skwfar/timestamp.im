import ReactGA from "react-ga4";

const initializeGA = () => {
    // Replace with your Measurement ID
    // It ideally comes from an environment variable
    ReactGA.initialize("G-LBEHR5JSQN");
    // Don't forget to remove the console.log() statements
    // when you are done
    console.log("GA INITIALIZED");
};

const trackGAEvent = (category: string, action: string, label?: string) => {
    console.log('GA event:', category, ':', action, ':', label);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

export default initializeGA;
export { initializeGA, trackGAEvent };