"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<
    {
      id: string;
      values: { title: string; desc: string };
    }[]
  >([]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log(event);
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title")?.toString();
    const desc = formData.get("desc")?.toString();

    if (title && desc)
      setTodos([
        ...todos,
        {
          id: Math.floor(Math.random() * 1000).toString(),
          values: { title, desc },
        },
      ]);
    const target = event.target as HTMLFormElement;
    target.reset();
  };

  return (
    <main className="flex flex-col min-h-screen p-9">
      <form
        className="flex mt-9 gap-4 flex-col items-center"
        id="todoform"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full">
          <label className="w-[100px] flex items-center" htmlFor="title">
            {" "}
            Title:{" "}
          </label>
          <input
            className="ring-1 w-full px-2 h-[40px]"
            type="text"
            name="title"
          />
        </div>
        <div className="flex w-full">
          <label className="w-[100px] flex items-center" htmlFor="desc">
            {" "}
            Desc:{" "}
          </label>
          <input
            className="ring-1 w-full px-2 h-[40px]"
            type="text"
            name="desc"
          />
        </div>

        <button
          className=" ring-red-300 ring-1 w-24 rounded-lg h-9"
          type="submit"
        >
          Add Item
        </button>
      </form>

      {todos.length > 0 && (
        <table className="mt-9 border-[1px] border-black p-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((obj) => {
              return (
                <tr>
                  <td className="text-center">{obj.id}</td>
                  <td className="text-center">{obj.values.title}</td>
                  <td className="text-center">{obj.values.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
