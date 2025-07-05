
export function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">IT Support</h3>
        <p className="text-gray-600 dark:text-gray-300">Comprehensive technical support for businesses of all sizes</p>
      </div>
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Network Solutions</h3>
        <p className="text-gray-600 dark:text-gray-300">Custom network design and implementation services</p>
      </div>
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Cybersecurity</h3>
        <p className="text-gray-600 dark:text-gray-300">Protect your business with our advanced security protocols</p>
      </div>
    </div>
  );
}
