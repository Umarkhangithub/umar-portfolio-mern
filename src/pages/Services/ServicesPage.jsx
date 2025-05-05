import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../features/services/servicesSlice";
import ContainerComponents from "../../components/container/ContainerComponents";

// Lazy load components
const ServiceSkeleton = lazy(() => import("../../components/UI/skeleton/ServiceSkeleton"));
const ServiceCard = lazy(() => import("../../components/UI/Service/ServiceCard"));

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const skeletonArray = useMemo(() => Array(6).fill(0), []);

  return (
    <ContainerComponents>
      <section className="min-h-screen bg-[#222222] py-12 px-6">
        <div className="text-center my-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Our Services</h2>
          <p className="text-lg text-[#BDC3C7] ">
            Explore the range of services we offer to help you achieve success.
          </p>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <Suspense fallback={
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletonArray.map((_, idx) => (
              <div key={idx} className="animate-pulse h-48 bg-[#BDC3C7]  rounded-lg" />
            ))}
          </div>
        }>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {loading
              ? skeletonArray.map((_, idx) => <ServiceSkeleton key={idx} />)
              : services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    category={service.category}
                  />
                ))}
          </div>
        </Suspense>

        {!loading && services.length === 0 && (
          <p className="text-center text-gray-300 mt-6">
            No services available at the moment. Please check back later.
          </p>
        )}
      </section>
    </ContainerComponents>
  );
};

export default ServicesPage;
