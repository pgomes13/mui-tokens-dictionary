import { ColorSection } from '@/components/designer/ColorSection'
import { TypographySection } from '@/components/designer/TypographySection'
import { SpacingSection } from '@/components/designer/SpacingSection'
import { SimpleTokenSection } from '@/components/designer/SimpleTokenSection'
import { downloadW3CExport } from '@/lib/w3cExport'
import { rawTokenFiles } from '@/tokens'
import type { TokenData } from '@/hooks/useTokenData'

interface Props {
  data: TokenData
  activeCategory: string
}

export function DesignerPage({ data, activeCategory }: Props) {
  const { byCategory } = data

  return (
    <main className="main-content">
      <div className="page-header">
        <h1>Design Tokens</h1>
        <button className="primary" onClick={() => downloadW3CExport(rawTokenFiles)}>
          Download Tokens Studio JSON
        </button>
      </div>

      {(activeCategory === 'palette') &&
        <ColorSection tokens={[...(byCategory.get('palette') ?? [])]} />
      }
      {activeCategory === 'typography' &&
        <TypographySection tokens={byCategory.get('typography') ?? []} />
      }
      {activeCategory === 'spacing' &&
        <SpacingSection tokens={byCategory.get('spacing') ?? []} />
      }
      {activeCategory === 'shape' &&
        <SimpleTokenSection id="shape" title="Shape" tokens={byCategory.get('shape') ?? []}
          renderPreview={t => <div style={{ width: 24, height: 24, background: '#1976d2', borderRadius: t.value }} />}
        />
      }
      {activeCategory === 'breakpoints' &&
        <SimpleTokenSection id="breakpoints" title="Breakpoints" tokens={byCategory.get('breakpoints') ?? []} />
      }
      {activeCategory === 'zIndex' &&
        <SimpleTokenSection id="zIndex" title="Z-Index" tokens={byCategory.get('zIndex') ?? []} />
      }
      {activeCategory === 'transitions' &&
        <SimpleTokenSection id="transitions" title="Transitions" tokens={byCategory.get('transitions') ?? []} />
      }
    </main>
  )
}
