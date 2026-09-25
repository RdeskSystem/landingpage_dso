import configPromise from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { importMap } from "../importMap";

export const dynamic = "force-dynamic";

type MetadataProps = Parameters<typeof generatePageMetadata>[0];

type AdminPageProps = Readonly<{
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>;

export function generateMetadata(props: Omit<MetadataProps, "config">): Promise<Metadata> {
  return generatePageMetadata({ ...props, config: configPromise });
}

export default function Page({ params, searchParams }: AdminPageProps) {
  const payloadParams = params.then(({ segments = [] }) => ({ segments }));
  const payloadSearchParams = searchParams as Promise<Record<string, string | string[]>>;

  return RootPage({
    config: configPromise,
    importMap,
    params: payloadParams,
    searchParams: payloadSearchParams,
  });
}
