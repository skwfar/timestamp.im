import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-4 mt-8">
      <div className="container mx-auto lg:w-1/2 xl:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Tools</h3>
            <ul className="space-y-1">
              <li><a href="/en/t/discord" className="hover:text-accent">Discord Timestamp</a></li>
              <li><a href="/en/t/timezone" className="hover:text-accent">Timezone Converter</a></li>
              <li><a href="/en/t/iso8601" className="hover:text-accent">ISO 8601 Converter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><a href="/en/privacy" className="hover:text-accent">Privacy Policy</a></li>
              <li><a href="/en/terms" className="hover:text-accent">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-xs">
              Free online timestamp conversion tools for developers and data analysts.
            </p>
          </div>
        </div>
        <div className="border-t border-neutral-focus mt-4 pt-4 text-center text-xs">
          <p>&copy; 2024 Timestamp.im. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
  
  export default Footer;