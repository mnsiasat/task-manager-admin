import { getTasks } from '@/service/actions'
import DeleteButton from '@/components/DeleteButton'
import EditButton from '@/components/EditButton'
import { Status } from '@/dto/task.dto'

export default async function TaskList() {
  const data = await getTasks()

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-5 bg-gray-800 p-2 font-bold border-b border-gray-700">
        <div className="p-2">ID</div>
        <div className="p-2">Title</div>
        <div className="p-2">Description</div>
        <div className="p-2">Status</div>
      </div>
      {data &&
        data.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-5 border-b border-gray-700 p-2 items-center"
          >
            <div className="p-2">{task.id}</div>
            <div className="p-2 flex items-center space-x-2">
              <span>{task.title}</span>
            </div>
            <div className="p-2">{String(task.description)}</div>
            <div
              className={`p-2 
                ${
                  task.status === Status.COMPLETED
                    ? 'text-blue-400'
                    : task.status === Status.TO_DO
                      ? 'text-yellow-400'
                      : 'text-green-400'
                } font-bold`}
            >
              {task.status}
            </div>
            <div className="p-2 flex space-x-2 justify-center">
              <EditButton task={task} />
              <DeleteButton task={task} />
            </div>
          </div>
        ))}
    </div>
  )
}
