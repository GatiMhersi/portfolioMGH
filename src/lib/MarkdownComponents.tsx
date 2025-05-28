import { ComponentPropsWithoutRef } from "react";
import { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-3xl font-bold mt-6 mb-2" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-2xl font-semibold mt-5 mb-2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 my-4" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 my-4" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="mb-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4"
      {...props}
    />
  ),
  code: ({
    inline,
    children,
    className,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) =>
    inline ? (
      <code className="bg-gray-800 text-orange-400 px-1 rounded" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-gray-800 text-sm p-4 rounded overflow-x-auto" {...props}>
        <code className={className}>{children}</code>
      </pre>
    ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-blue-400 underline hover:text-blue-200" {...props} />
  ),
};
