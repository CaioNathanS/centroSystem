import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Nathan',
      email: 'ademir@example.com',
      password: bcrypt.hashSync('12345', 8),
      isAdmin: true,
    
    },
    {
      name: 'Gabs',
      email: 'gabs@gmail.com',
      password: bcrypt.hashSync('12345', 8),
      isAdmin: true,
 
    }    
  ],
  velhos: [
    {
      nome: 'Vô',
      medium: 'Edon',
      numFila: 15
    },
    {
      nome: 'Vó',
      medium: 'Beth',
      numFila: 7
    } 
  ],
  agendamentos: [
    {
      diaData: '18/05/2022',
      velho: 'Edon',
      name: "Lulu",
      email:"lulu@gmail.com",
      numFila:10
    },
    {
      diaData: '19/05/2022',
      velho: 'Beth',
      name: "GuiGui",
      email:"guigui@gmail.com",
      numFila:8
    } 
  ],
  agendas: [
    {
      diaData:'22/05/2022',
      aberto:true,
      velhos:[
          {
          name:'Vó',
          medium:'Beth',
          numFila:5
          },
          {
          name:'Vô',
          medium:'Edon',
          numFila:2 
          }
        ],
      agendamentos:[
          {
          nome:"Lulu",
          email:"lulu@gmail.com"
          },
          {
          nome:'Guigui',
          email:"guigui@email.com" 
          }
      ]
    },
    {
      diaData:'22/05/2022',
      aberto:true,
      velhos:[
          {
          name:'Vó',
          medium:'Beth',
          numFila:3
          },
          {
          name:'Vô',
          medium:'Edon',
          numFila:1 
          }
        ],
      agendamentos:[
          {
          nome:"Nathan",
          email:"ntz@gmail.com"
          },
          {
          nome:'Rapha',
          email:"tiber@email.com" 
          }
      ]
    }
    
  ],
 

  
};
export default data;
