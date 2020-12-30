import { encodeXml, XmlComponent, XmlRaw } from '../xml'
import { Pptx } from '../pptx'

export interface AppPropertiesOptions {
  company?: string;
}

export class AppProperties extends XmlComponent {
  constructor (readonly options: AppPropertiesOptions = {}, readonly pptx: Pptx) {
    super()
  }

  xmlComponent (): XmlRaw {
    const options = this.options
    const pptx = this.pptx
    return {
      type: 'raw',
      xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
          xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
          <TotalTime>0</TotalTime>
          <Words>0</Words>
          <Application>Microsoft Macintosh PowerPoint</Application>
          <PresentationFormat>Widescreen</PresentationFormat>
          <Paragraphs>0</Paragraphs>
          <Slides>${pptx.slides.length}</Slides>
          <Notes>${pptx.noteSlides.length}</Notes>
          <HiddenSlides>0</HiddenSlides>
          <MMClips>0</MMClips>
          <ScaleCrop>false</ScaleCrop>
          <HeadingPairs>
              <vt:vector size="6" baseType="variant">
                  <vt:variant>
                      <vt:lpstr>Fonts Used</vt:lpstr>
                  </vt:variant>
                  <vt:variant>
                      <vt:i4>3</vt:i4>
                  </vt:variant>
                  <vt:variant>
                      <vt:lpstr>Theme</vt:lpstr>
                  </vt:variant>
                  <vt:variant>
                      <vt:i4>1</vt:i4>
                  </vt:variant>
                  <vt:variant>
                      <vt:lpstr>Slide Titles</vt:lpstr>
                  </vt:variant>
                  <vt:variant>
                      <vt:i4>${pptx.slides.length}</vt:i4>
                  </vt:variant>
              </vt:vector>
          </HeadingPairs>
          <TitlesOfParts>
              <vt:vector size="${pptx.slides.length + 4}" baseType="lpstr">
                  <vt:lpstr>Arial</vt:lpstr>
                  <vt:lpstr>Calibri</vt:lpstr>
                  <vt:lpstr>Calibri Light</vt:lpstr>
                  <vt:lpstr>Office Theme</vt:lpstr>
                  ${'<vt:lpstr>PowerPoint Presentation</vt:lpstr>'.repeat(pptx.slides.length)}
              </vt:vector>
          </TitlesOfParts>
          <Company>${encodeXml(options.company)}</Company>
          <LinksUpToDate>false</LinksUpToDate>
          <SharedDoc>false</SharedDoc>
          <HyperlinksChanged>false</HyperlinksChanged>
          <AppVersion>16.0000</AppVersion>
      </Properties>`,
    }
  }
}
