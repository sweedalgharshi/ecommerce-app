import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-[450px]" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Forever, we believe shopping should be seamless, stylish, and satisfying. Our mission
            is to bring you high-quality products at unbeatable prices, with a focus on innovation,
            affordability, and customer satisfaction. Whether you're looking for the latest trends,
            everyday essentials, or unique finds, we’ve got you covered. With fast shipping, secure
            payments, and exceptional customer service, we make online shopping effortless.
          </p>
          <p>
            Our mission is to make online shopping effortless, enjoyable, and accessible to
            everyone. Whether you're searching for the latest fashion, must-have gadgets, home
            essentials, or unique finds, we’ve curated a collection that suits every lifestyle.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Join our growing community of happy shoppers and experience the difference. Welcome to
            Forever—where quality meets convenience!
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We carefully source and inspect every product to ensure it meets our high standards for
            durability, functionality, and craftsmanship.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Our 24/7 customer support ensures you get assistance whenever you need it.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our friendly support team is available 24/7 to assist with any questions or concerns.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}
export default About;
