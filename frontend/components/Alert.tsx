export default function Alert({ message }: { message:string }) {
  if(!message) return null;
  return <div className="p-3 bg-red-100 text-red-800 rounded">{message}</div>;
}
