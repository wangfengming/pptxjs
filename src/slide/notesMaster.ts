import { XmlComponent, XmlRaw } from '../xml'
import { Pptx } from '../pptx'

export class NotesMaster extends XmlComponent {
  constructor (readonly pptx: Pptx) {super()}

  xmlComponent (): XmlRaw | undefined {
    if (!this.pptx.noteSlides.length) return
    return {
      type: 'raw',
      xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <p:notesMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
          xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
          <p:cSld>
              <p:bg>
                  <p:bgRef idx="1001">
                      <a:schemeClr val="bg1"/>
                  </p:bgRef>
              </p:bg>
              <p:spTree>
                  <p:nvGrpSpPr>
                      <p:cNvPr id="1" name=""/>
                      <p:cNvGrpSpPr/>
                      <p:nvPr/>
                  </p:nvGrpSpPr>
                  <p:grpSpPr>
                      <a:xfrm>
                          <a:off x="0" y="0"/>
                          <a:ext cx="0" cy="0"/>
                          <a:chOff x="0" y="0"/>
                          <a:chExt cx="0" cy="0"/>
                      </a:xfrm>
                  </p:grpSpPr>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="2" name="Header Placeholder 1"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="hdr" sz="quarter"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="0" y="0"/>
                              <a:ext cx="2971800" cy="458788"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/>
                          <a:lstStyle>
                              <a:lvl1pPr algn="l">
                                  <a:defRPr sz="1200"/>
                              </a:lvl1pPr>
                          </a:lstStyle>
                          <a:p>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="3" name="Date Placeholder 2"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="dt" idx="1"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="3884613" y="0"/>
                              <a:ext cx="2971800" cy="458788"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/>
                          <a:lstStyle>
                              <a:lvl1pPr algn="r">
                                  <a:defRPr sz="1200"/>
                              </a:lvl1pPr>
                          </a:lstStyle>
                          <a:p>
                              <a:fld id="{59917CEC-1851-A44A-838E-D877194EF31E}" type="datetimeFigureOut">
                                  <a:rPr lang="en-CN" smtClean="0"/>
                                  <a:t>2020/10/31</a:t>
                              </a:fld>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="4" name="Slide Image Placeholder 3"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="sldImg" idx="2"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="685800" y="1143000"/>
                              <a:ext cx="5486400" cy="3086100"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                          <a:noFill/>
                          <a:ln w="12700">
                              <a:solidFill>
                                  <a:prstClr val="black"/>
                              </a:solidFill>
                          </a:ln>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"/>
                          <a:lstStyle/>
                          <a:p>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="5" name="Notes Placeholder 4"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="body" sz="quarter" idx="3"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="685800" y="4400550"/>
                              <a:ext cx="5486400" cy="3600450"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/>
                          <a:lstStyle/>
                          <a:p>
                              <a:pPr lvl="0"/>
                              <a:r>
                                  <a:rPr lang="en-US"/>
                                  <a:t>Click to edit Master text styles</a:t>
                              </a:r>
                          </a:p>
                          <a:p>
                              <a:pPr lvl="1"/>
                              <a:r>
                                  <a:rPr lang="en-US"/>
                                  <a:t>Second level</a:t>
                              </a:r>
                          </a:p>
                          <a:p>
                              <a:pPr lvl="2"/>
                              <a:r>
                                  <a:rPr lang="en-US"/>
                                  <a:t>Third level</a:t>
                              </a:r>
                          </a:p>
                          <a:p>
                              <a:pPr lvl="3"/>
                              <a:r>
                                  <a:rPr lang="en-US"/>
                                  <a:t>Fourth level</a:t>
                              </a:r>
                          </a:p>
                          <a:p>
                              <a:pPr lvl="4"/>
                              <a:r>
                                  <a:rPr lang="en-US"/>
                                  <a:t>Fifth level</a:t>
                              </a:r>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="6" name="Footer Placeholder 5"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="ftr" sz="quarter" idx="4"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="0" y="8685213"/>
                              <a:ext cx="2971800" cy="458787"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="b"/>
                          <a:lstStyle>
                              <a:lvl1pPr algn="l">
                                  <a:defRPr sz="1200"/>
                              </a:lvl1pPr>
                          </a:lstStyle>
                          <a:p>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
                  <p:sp>
                      <p:nvSpPr>
                          <p:cNvPr id="7" name="Slide Number Placeholder 6"/>
                          <p:cNvSpPr>
                              <a:spLocks noGrp="1"/>
                          </p:cNvSpPr>
                          <p:nvPr>
                              <p:ph type="sldNum" sz="quarter" idx="5"/>
                          </p:nvPr>
                      </p:nvSpPr>
                      <p:spPr>
                          <a:xfrm>
                              <a:off x="3884613" y="8685213"/>
                              <a:ext cx="2971800" cy="458787"/>
                          </a:xfrm>
                          <a:prstGeom prst="rect">
                              <a:avLst/>
                          </a:prstGeom>
                      </p:spPr>
                      <p:txBody>
                          <a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="b"/>
                          <a:lstStyle>
                              <a:lvl1pPr algn="r">
                                  <a:defRPr sz="1200"/>
                              </a:lvl1pPr>
                          </a:lstStyle>
                          <a:p>
                              <a:fld id="{039739AD-86A2-E941-9686-E04A8F4E8271}" type="slidenum">
                                  <a:rPr lang="en-CN" smtClean="0"/>
                                  <a:t>‹#›</a:t>
                              </a:fld>
                              <a:endParaRPr lang="en-CN"/>
                          </a:p>
                      </p:txBody>
                  </p:sp>
              </p:spTree>
              <p:extLst>
                  <p:ext uri="{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}">
                      <p14:creationId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1339735696"/>
                  </p:ext>
              </p:extLst>
          </p:cSld>
          <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
          <p:notesStyle>
              <a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl1pPr>
              <a:lvl2pPr marL="457200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl2pPr>
              <a:lvl3pPr marL="914400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl3pPr>
              <a:lvl4pPr marL="1371600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl4pPr>
              <a:lvl5pPr marL="1828800" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl5pPr>
              <a:lvl6pPr marL="2286000" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl6pPr>
              <a:lvl7pPr marL="2743200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl7pPr>
              <a:lvl8pPr marL="3200400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl8pPr>
              <a:lvl9pPr marL="3657600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
                  <a:defRPr sz="1200" kern="1200">
                      <a:solidFill>
                          <a:schemeClr val="tx1"/>
                      </a:solidFill>
                      <a:latin typeface="+mn-lt"/>
                      <a:ea typeface="+mn-ea"/>
                      <a:cs typeface="+mn-cs"/>
                  </a:defRPr>
              </a:lvl9pPr>
          </p:notesStyle>
      </p:notesMaster>`,
    }
  }
}
