
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="bg-[#165a87] text-white px-4 py-2 rounded hover:bg-[#38b6ff]">{children}</button>;
}
