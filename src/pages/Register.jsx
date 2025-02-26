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
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters!")
    .max(8, "Name must not be longer than 8 characters!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters!")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
    .matches(/\d/, "Password must contain at least one number!"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords don't match!"),
});

const Register = () => {
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
            <CardTitle>Register Here</CardTitle>
            <CardDescription>
              Register now to enjoy unlimited shopping.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-2"
            >
              <Input
                id="name"
                type="text"
                placeholder="Name"
                className="focus-visible:ring-0"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="focus-visible:ring-0"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="focus-visible:ring-0"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="focus-visible:ring-0"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                className="mx-auto mt-4 hover:bg-slate-200"
              >
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex items-center text-sm gap-x-1">
              <p className="text-gray-700">Already have an account?</p>
              <Button variant="link" className="p-0 h-0">
                <Link to="/login" className="text-gray-700">
                  Login here
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </Layout>
  );
};

export default Register;
