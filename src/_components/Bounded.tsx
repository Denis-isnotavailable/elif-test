import React from 'react'

type BoundedProps = {    
    className?: string,
    children: React.ReactNode
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({ className, children, ...restProps }, ref) => {
        return <section
            ref={ref}
            className={`px-4 py-6 md:px-6 md:py-8 lg:py-10 ${className}`}
            {...restProps}
        >
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </section>;
    }
);

Bounded.displayName = "Bounded";

export default Bounded;