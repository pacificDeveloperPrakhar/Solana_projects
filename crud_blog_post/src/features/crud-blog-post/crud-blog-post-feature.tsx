import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { CrudBlogPostUiProgramExplorerLink } from './ui/crud-blog-post-ui-program-explorer-link'
import { CrudBlogPostUiCreate } from './ui/crud-blog-post-ui-create'
import { CrudBlogPostUiProgram } from '@/features/crud-blog-post/ui/crud-blog-post-ui-program'

export default function CrudBlogPostFeature() {
  const { account } = useSolana()

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="hero py-[64px]">
          <div className="hero-content text-center">
            <WalletDropdown />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppHero title="CrudBlogPost" subtitle={'Run the program by clicking the "Run program" button.'}>
        <p className="mb-6">
          <CrudBlogPostUiProgramExplorerLink />
        </p>
        <CrudBlogPostUiCreate />
      </AppHero>
      <CrudBlogPostUiProgram />
    </div>
  )
}
