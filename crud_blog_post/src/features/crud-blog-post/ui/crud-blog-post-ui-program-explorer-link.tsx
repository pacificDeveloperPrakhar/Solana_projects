import { useCrudBlogPostProgramId } from '@/features/crud-blog-post/data-access/use-crud-blog-post-program-id'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function CrudBlogPostUiProgramExplorerLink() {
  const programId = useCrudBlogPostProgramId()

  return <AppExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
}
