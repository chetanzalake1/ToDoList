"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<
    {
      id: string;
      val: { title: string; desc: string; status: boolean };
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
          val: { title, desc, status: false },
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
            className="ring-1 w-full px-2 h-[40px] rounded-xl"
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
            className="ring-1 w-full px-2 h-[40px] rounded-xl"
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
        <table className="mt-9 border-[1px] border-black p-4 table-fixed w-full">
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
                <tr className="">
                  <th
                    className={`text-center w-9 ${
                      obj.val.status ? "line-through" : ""
                    }`}
                  >
                    {obj.id}
                  </th>
                  <td
                    className={`text-center p-2 ${
                      obj.val.status ? "line-through" : ""
                    }`}
                  >
                    {obj.val.title}
                  </td>
                  <td
                    className={`text-center p-2 ${
                      obj.val.status ? "line-through" : ""
                    }`}
                  >
                    {obj.val.desc}
                  </td>
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      id="completed"
                      name="status"
                      value="true"
                      onClick={() => {
                        const allTodos = [...todos];
                        const myObj = allTodos.filter(
                          (objec) => objec.id === obj.id
                        )[0];
                        myObj.val.status = !myObj.val.status;
                        setTodos(allTodos);
                      }}
                    />
                    {obj.val.status ? "  Completed" : "  In progress"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
