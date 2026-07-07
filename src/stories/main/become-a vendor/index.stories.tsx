import { BecomeVendor } from "@/components/main/become-a-vendor/become-a vendor";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function BecomeVendorComp() {
  return <BecomeVendor />;
}

const meta: Meta<typeof BecomeVendorComp> & TypedMetaOptions = {
  component: BecomeVendorComp,
};

export default meta;

type Story = StoryObj<typeof BecomeVendorComp>;

export const BecomeVendorCompStory: Story = {
  args: {},
};
