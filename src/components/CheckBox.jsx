export default function CheckBox({ name, children, checked, onChange }) {
  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        name={name}
      />
      <label className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300">
        {children}
      </label>
    </div>
  );
}
