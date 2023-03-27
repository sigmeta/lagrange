import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'

const Availability = () => {
  const [startX, setStartX] = useState('')
  const [startY, setStartY] = useState('')
  const [targetX, setTargetX] = useState('')
  const [targetY, setTargetY] = useState('')
  const [outpostX, setOutpostX] = useState('')
  const [outpostY, setOutpostY] = useState('')
  const [interferenceX, setInterferenceX] = useState('')
  const [interferenceY, setInterferenceY] = useState('')
  const [statusMessage, setStatusMessage] = useState('请输入坐标并提交')
  const [statusStyle, setStatusStyle] = useState('text-white bg-primary py-5')

  const distance = (ax, ay, bx, by) => {
    return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    var sx = Number(startX)
    var sy = Number(startY)
    var tx = Number(targetX)
    var ty = Number(targetY)
    var ox = Number(outpostX)
    var oy = Number(outpostY)
    var ix = Number(interferenceX)
    var iy = Number(interferenceY)
    var a = distance(sx, sy, ox, oy)
    var b = distance(ox, oy, tx, ty)
    var c = distance(sx, sy, ix, iy)
    var d = distance(ix, iy, tx, ty)
    var ok = a / 5 + b < c / 5 + d
    if (ok) {
      setStatusStyle('text-white bg-success py-5')
      setStatusMessage('报告首长，天气晴朗，可以起飞！')
    } else {
      setStatusStyle('text-white bg-danger py-5')
      setStatusMessage('很遗憾，所选位置无法起飞=_=')
    }
    console.log(ok)
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>空降坐标检测器</h1>
                    <p className="text-medium-emphasis">请输入坐标检测是否可以空降</p>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">起飞点坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="startX"
                            required
                            value={startX}
                            onChange={(event) => setStartX(event.target.value)}
                          />
                          <CFormInput
                            id="startY"
                            required
                            value={startY}
                            onChange={(event) => setStartY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">落点坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="targetX"
                            required
                            value={targetX}
                            onChange={(event) => setTargetX(event.target.value)}
                          />
                          <CFormInput
                            id="targetY"
                            required
                            value={targetY}
                            onChange={(event) => setTargetY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">前哨坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="outpostX"
                            required
                            value={outpostX}
                            onChange={(event) => setOutpostX(event.target.value)}
                          />
                          <CFormInput
                            id="outpostY"
                            required
                            value={outpostY}
                            onChange={(event) => setOutpostY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-4 col-form-label">干扰点坐标</CFormLabel>
                      <CCol sm={8}>
                        <CInputGroup>
                          <CFormInput
                            id="interferenceX"
                            required
                            value={interferenceX}
                            onChange={(event) => setInterferenceX(event.target.value)}
                          />
                          <CFormInput
                            id="interferenceY"
                            required
                            value={interferenceY}
                            onChange={(event) => setInterferenceY(event.target.value)}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <br />
                    <CRow>
                      <div className="d-grid gap-2 col-8 mx-auto">
                        <CButton color="primary" className="px-4" type="submit">
                          提交
                        </CButton>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className={statusStyle}>
                <CCardBody className="text-center">
                  <div>
                    <h2>检测结果</h2>
                    <br />
                    <p>{statusMessage}</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Availability
