import { Button } from "../../component/Button";
import { Form } from "../../component/form";

export const LoginPage = () => {
  return (
    <main className="mt-16 flex-1">
      <div className="flex min-h-[calc(100vh-5vh)] items-center justify-center">
        <div className="h-[60vh] w-[80vw] border border-black md:w-[50vw]">
          <form
            action=""
            className="flex h-full flex-col items-center justify-center py-16"
          >
            <div className="my-8 flex w-full flex-col">
              <label className="mb-2 ml-[15%] text-left" htmlFor="id">
                ID
              </label>
              <div className="flex justify-center">
                <Form title="ID" label="id" />
              </div>
            </div>
            <div className="my-8 flex w-full flex-col">
              <label className="mb-2 ml-[15%] text-left" htmlFor="password">
                Password
              </label>
              <div className="flex justify-center">
                <Form title="Password" label="password" />
              </div>
            </div>
            <div className="my-8 flex justify-center">
              <Button
                name="ログイン"
                color="bg-main-color"
                action=""
                decoration="rounded-lg text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
