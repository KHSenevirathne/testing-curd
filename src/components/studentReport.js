export default function StudentReport() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Report Page</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input 
            type="text" 
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter name"
          />
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
      </form>
    </div>
  );
}
