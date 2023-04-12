import CopyToClipboard from './copy-to-clipboard';

interface ExampleMainProps {
  title: string;
  children: React.ReactNode;
  markup: string;
}

export function Preview({ title, children, markup }: ExampleMainProps) {
  return (
    <main className="relative py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
      <h2 className="mt-12 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight dark:border-b-slate-700">
        Preview
      </h2>
      <div className="my-6 min-h-[350px] overflow-hidden rounded-md border border-slate-200 p-10 dark:border-slate-800">
        {children}
      </div>
      <h2 className="mt-12 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight dark:border-b-slate-700">
        Code
      </h2>
      <CopyToClipboard className="my-6 rounded-md">
        <div
          {...{ ['data-shiki-pretty-code-fragment']: '' }}
          dangerouslySetInnerHTML={{
            __html: markup,
          }}
        />
      </CopyToClipboard>
    </main>
  );
}
