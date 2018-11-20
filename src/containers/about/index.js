import React from 'react'
import { Layout} from 'antd';
const {Content} = Layout;

const About = () => (
  <Layout className="layout">
    <Content>
      <h1 className="header">Futureskill Team</h1>
      <div className="container">
        <p>
          FutureSkill.co เว็บไซต์และแอพพลิเคชั่นเรียนรู้ทักษะรูปแบบใหม่ ที่ต้องการเพิ่มศักยภาพของคนไทยด้าน Technology Business และ Creativity <br/>
          เราเห็นอุปสรรคใหญ่ที่สุดของบ้านเรา คือเรื่องทักษะและการพัฒนาตัวเอง จากสถิติพนักงานไทยกว่าครึ่งไม่พร้อมแข่งขันในยุค Digital เสียด้วยซํ้า <br/>นี่คือเหตุผลที่เราสร้าง FutureSkill ขึ้นมา โดยเรามีเป้าหมายที่ต้องการเปลี่ยนคน 100,000 คนภายในปี 2019
          ขณะนี้เรากำลังขยายทีม และอยากชวนคนที่มีอุดมการณ์ที่ต้องการเห็นความเปลี่ยนแปลงที่จับต้องได้ มาร่วมกับเรา!
        </p>
        <img className="img" src="https://cdn-images-1.medium.com/max/1200/1*YUgt_aABOjm41Hapy1phqA.png" />
      </div>
    </Content>
  </Layout>
)

export default About
