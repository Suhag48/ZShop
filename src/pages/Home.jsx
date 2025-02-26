import Layout from "../components/layout/Layout";
import Category from "../components/Category";
import PriceFilter from "../components/PriceFilter";
import Brands from "../components/Brands";
import FeaturedProducts from "../components/FeaturedProducts";
import Slide from "../components/Slide";
import Paging from "../components/Paging";

import Products from "../components/Products";
import TextFilter from "../components/TextFilter";
import MobileFilter from "../components/MobileFilter";
import TopSellingProducts from "../components/TopSellingProducts";

const Home = () => {
  return (
    <Layout>
      <section className="px-4 md:px-12 lg:px-28 mx-auto md:grid grid-cols-4 gap-x-4 md:gap-x-6 xl:gap-x-8 py-12 md:py-20">
        {/* left sidebar */}
        <div className="md:flex flex-col gap-y-8 col-span-1 hidden">
          <Category />
          <Brands />
          <TextFilter />
          <PriceFilter />
          <TopSellingProducts />
          <FeaturedProducts />
        </div>

        {/* right sidebar */}
        <div className="col-span-3 relative">
          <Slide />
          <MobileFilter />
          <Products />
          <div className="sm:absolute mx-auto bottom-0 right-0 left-0">
            <Paging />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
