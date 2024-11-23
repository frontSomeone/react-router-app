import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { mockFetch } from "../utils/api";
import { Loader } from "../components/Loader";

export const startBookAction = async ({ params: { id }, request }) => {
  const formData = await request.formData();
  console.debug(formData);

  const bookDetails = await mockFetch(`/books/${id}`);

  if (!formData.get("name")) {
    return json({ message: "Name field can't be empty" }, { status: 400 });
  }

  alert(`${formData.get("name")}, welcome to book ${bookDetails.title}`);

  return redirect(`/books/${id}`);
};

export const StartBookPage = () => {
  const navigation = useNavigation();
  const data = useActionData();

  return (
    <div className="pt-10 flex flex-col items-center">
      <h1 className="text-xl font-medium text-black mb-5">
        Start your reading path now
      </h1>

      {data?.message && <p className="pb-3 text-red-900">{data.message}</p>}

      {navigation.state === "submitting" && <Loader />}

      <Form method="post" className="flex flex-col items-center">
        <p>Введите имя<span style={{color: "red "}}>*</span></p>
        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Enter your name"
        />
        <p>Введите почту</p>
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <button className="button" type="submit">
          Start read
        </button>
      </Form>
    </div>
  );
};
