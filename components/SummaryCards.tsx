import { CountPerStatus } from '@/service/actions'

export default async function SummaryCards() {
  //const data = await getSummary()
  const data: CountPerStatus[] = []
  return (
    <>
      <div className="flex justify-between mt-4 gap-4">
        {data &&
          data.map((summary, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center w-1/3">
              <span className="text-xl font-bold block">{summary.count}</span>
              {summary.taskStatus}
            </div>
          ))}
      </div>
    </>
  )
}
