import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Layout from "../components/layout/Layout";

// Define Yup schema for validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  // Use React Hook Form with Yup schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <section className="flex justify-center items-center py-12 md:py-20">
        <Card className="w-[350px] bg-gray-100">
          <CardHeader className="text-center">
            <CardTitle>Login Here</CardTitle>
            <CardDescription>Login to enjoy shopping.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-2"
            >
              <Input
                id="email"
                type="email"
                placeholder="email"
                className="focus-visible:ring-0"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Input
                id="password"
                type="password"
                placeholder="password"
                className="focus-visible:ring-0"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                className="mx-auto mt-4 hover:bg-slate-200"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex items-center text-sm gap-x-1">
              <p className="text-gray-700">{`Don't have an account?`}</p>
              <Button variant="link" className="p-0 h-0">
                <Link to="/register" className="text-gray-700">
                  Register here
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </Layout>
  );
};

export default Login;
