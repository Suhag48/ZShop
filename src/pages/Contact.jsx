import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import Layout from "../components/layout/Layout";

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters!")
    .max(8, "Name must not exceed 100 characters!")
    .required("Name is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  subject: yup
    .string()
    .min(10, "Subject must be at least 10 characters!")
    .required("Subject is required!"),
  message: yup
    .string()
    .min(20, "Message must be at least 20 characters")
    .required("Message is required!"),
});

const Contact = () => {
  // Use React Hook Form for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data); // Submit the form data
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 px-4 mx-auto">
        <div className="flex sm:flex-col lg:flex-row justify-center gap-6 w-full sm:w-[80%] md:w-[60%] lg:w-[85%] xl:w-[70%] h-auto mx-auto">
          {/* Google Map Embed */}
          <div className="w-full h-auto hidden lg:flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29189.78771265955!2d89.9829839238653!3d23.863951579927374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755f603f1698647%3A0x894c2f1900643eb6!2sManikganj!5e0!3m2!1sen!2sbd!4v1739295017615!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form Card */}
          <Card className="w-full lg:w-[70%] h-auto bg-gray-100">
            <CardHeader className="text-center">
              <CardTitle>Contact us</CardTitle>
              <CardDescription>Tell us your issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2"
              >
                {/* Name Input */}
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

                {/* Email Input */}
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

                {/* Subject Input */}
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="focus-visible:ring-0"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}

                {/* Message Textarea */}
                <Textarea
                  id="message"
                  placeholder="Message"
                  className="focus-visible:ring-0"
                  rows={6}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full hover:bg-slate-200"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
