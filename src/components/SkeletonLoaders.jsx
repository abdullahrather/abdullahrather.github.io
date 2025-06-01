import React from "react";

export const HeroSkeleton = () => (
  <section className='relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center'>
    <div className='mx-auto max-w-7xl'>
      <div className='skeleton skeleton-text large w-3/4 mx-auto mb-4'></div>
      <div className='skeleton skeleton-text large w-1/2 mx-auto mb-6'></div>
      <div className='skeleton skeleton-text w-1/3 mx-auto mb-10'></div>
      <div className='flex justify-center gap-4'>
        <div className='skeleton skeleton-button'></div>
        <div className='skeleton skeleton-button'></div>
      </div>
    </div>
  </section>
);

export const AboutSkeleton = () => (
  <section className='py-20'>
    <div className='container mx-auto px-6'>
      <div className='text-center mb-16'>
        <div className='skeleton skeleton-avatar mx-auto mb-8'></div>
        <div className='skeleton skeleton-text large w-1/3 mx-auto mb-4'></div>
        <div className='skeleton skeleton-text w-1/2 mx-auto'></div>
      </div>
      <div className='grid md:grid-cols-2 gap-12'>
        <div className='skeleton-card'>
          <div className='skeleton skeleton-text large mb-4'></div>
          <div className='skeleton skeleton-text mb-2'></div>
          <div className='skeleton skeleton-text mb-2'></div>
          <div className='skeleton skeleton-text w-3/4'></div>
        </div>
        <div className='skeleton-card'>
          <div className='skeleton skeleton-text large mb-4'></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='mb-4'>
              <div className='skeleton skeleton-text small mb-2'></div>
              <div className='skeleton skeleton-text h-2'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const ServicesSkeleton = () => (
  <section className='py-20'>
    <div className='container mx-auto px-6'>
      <div className='text-center mb-16'>
        <div className='skeleton skeleton-text large w-1/3 mx-auto mb-4'></div>
        <div className='skeleton skeleton-text w-1/2 mx-auto'></div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='skeleton-card'>
            <div className='skeleton skeleton-text w-12 h-12 rounded-lg mb-4'></div>
            <div className='skeleton skeleton-text large mb-2'></div>
            <div className='skeleton skeleton-text mb-2'></div>
            <div className='skeleton skeleton-text w-3/4 mb-4'></div>
            <div className='skeleton skeleton-text small w-1/2'></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProjectsSkeleton = () => (
  <section className='py-20'>
    <div className='container mx-auto px-6'>
      <div className='text-center mb-16'>
        <div className='skeleton skeleton-text large w-1/3 mx-auto mb-4'></div>
        <div className='skeleton skeleton-text w-1/2 mx-auto'></div>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='skeleton-card'>
            <div className='skeleton skeleton-text h-48 mb-4'></div>
            <div className='skeleton skeleton-text large mb-2'></div>
            <div className='skeleton skeleton-text mb-2'></div>
            <div className='skeleton skeleton-text w-3/4 mb-4'></div>
            <div className='flex gap-2'>
              <div className='skeleton skeleton-text small w-16'></div>
              <div className='skeleton skeleton-text small w-20'></div>
              <div className='skeleton skeleton-text small w-12'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ContactSkeleton = () => (
  <section className='py-20'>
    <div className='container mx-auto px-6'>
      <div className='text-center mb-16'>
        <div className='skeleton skeleton-text large w-1/3 mx-auto mb-4'></div>
        <div className='skeleton skeleton-text w-1/2 mx-auto'></div>
      </div>
      <div className='grid lg:grid-cols-2 gap-12'>
        {/* Contact Info Side */}
        <div className='skeleton-card'>
          <div className='skeleton skeleton-text large mb-6'></div>
          <div className='space-y-4 mb-8'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='flex items-center p-4 bg-slate-100/80 dark:bg-slate-800/60 rounded-lg'
              >
                <div className='skeleton skeleton-text w-6 h-6 rounded mr-4'></div>
                <div className='flex-1'>
                  <div className='skeleton skeleton-text mb-2'></div>
                  <div className='skeleton skeleton-text small w-3/4'></div>
                </div>
              </div>
            ))}
          </div>
          {/* Social links */}
          <div>
            <div className='skeleton skeleton-text mb-4'></div>
            <div className='flex flex-wrap gap-3'>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className='skeleton skeleton-button rounded-full'
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className='skeleton-card'>
          <div className='skeleton skeleton-text large mb-6'></div>
          <div className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='skeleton skeleton-text h-12'></div>
              <div className='skeleton skeleton-text h-12'></div>
            </div>
            <div className='skeleton skeleton-text h-12'></div>
            <div className='skeleton skeleton-text h-32'></div>
            <div className='skeleton skeleton-button w-full h-12'></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
