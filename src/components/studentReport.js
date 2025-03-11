export default function StudentReport() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Report Page</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter name"
            />
            <button
              type="button"
              className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter grade"
          />
        </div>

        <div className="space-x-4">
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
