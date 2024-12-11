import bcrypt from 'bcryptjs';
import { Users } from '../Models/ModelUser.js';
import { Tokens } from '../Models/ModelToken.js';
import crypto from 'crypto';
import sendMail from '../utils/sendEmails.js';

/**-------------------------------------------------------
 * créer un compte = Sign up = register new user (Student) : ( router : /api/auth/register_student) (method : post)
 * @desc register 
 * @route /api/auth/register_student
 * @method POST
 * @access public
 ---------------------------------------------------*/

async function registerStudent (req, res) {
   let user = await Users.findOne({email: req.body.email});
   if(user){
       return res.status(400).json({message : "Compte déja existe dans la base de donnée"});
   }
   const salt = await bcrypt.genSalt(10);
   const hashedpass = await bcrypt.hash(req.body.password, salt);

   let new_user = new Users({
       firstname: req.body.firstname,
       lastname : req.body.lastname,
       email : req.body.email,
       password : hashedpass,
       role: "etudiant",
       statut : "etudiant" // étudiant / stagiare / alternant / salarié
   });

   await new_user.save();
   //la verification de l'email :
   const verifyToken = new Tokens({
       user : new_user._id,
       token : crypto.randomBytes(32).toString("hex"),
   });

   await verifyToken.save();
   // Le lien${process.env.DOMAIN}
   const link = `http://localhost:3000/students/${new_user._id}/verify/${verifyToken.token}`;
   // Putting the link into an html template
   const htmlTemplate = `<!DOCTYPE html>
   <html lang="en">
   
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Email Template</title>
   </head>
   
   <body>
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
       <tr>
         <td align="center" bgcolor="#f5f5f5" style="padding: 20px;">
           <table border="0" cellpadding="0" cellspacing="0" width="100%">
             <tr>
               <td align="center" bgcolor="#ffffff" style="padding: 20px;">
                 <h4 style="font-size: 24px; margin-bottom: 10px;">Vérification de votre compte sur Connect-LR</h4>
                 <p style="font-size: 16px; margin-bottom: 20px;">Bienvenue ${req.body.firstname} ${req.body.lastname}</p>
                 <p style="font-size: 16px; margin-bottom: 20px;">Cliquez sur le lien ci-dessous pour vérifier votre compte sur Connect-LR</p>
                 <div style="text-align: center;">
                   <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Vérifier</a>
                 </div>
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </body>
   
   </html>
   `;
   await sendMail(new_user.email, "Verify Your Email", htmlTemplate);

   res.status(201).json({
       success : true,
       message: "Nous avons envoyé un Lien dans votre Adresse Email, Vérifiez S'il vous plait",
   });
   
}

/**-------------------------------------------------------
 * Signin = login = se connecter 
 * @desc Login User
 * @route /api/auth/Login
 * @method POST
 * @access public
 ---------------------------------------------------*/

 async function LoginUser(req, res){ 
    let user = await Users.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({message : "Invalid Email or Password"});
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
        return res.status(400).json({message : "Invalid Email or Password"});
    }
    if(!user.isVerified){
        return res.status(400).json({message : "Votre Compte n'est pas active, Verifier Votre Email"});
    }
    // generate token jwt
    const token = user.generateAuthToken();
    //response to client
    res.status(200).json({_id: user._id, firstname:user.firstname, lastname:user.lastname, photo:user.photo,role:user.role, token});
 }

/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/verify/:userId/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 async function verifyUserAccountCtrl(req, res){
    const user = await Users.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ success:false, message: "invalid link" });
    }
  
    const verificationToken = await Tokens.findOne({
      user: req.params.userId,
      token: req.params.token,
    });
  
    if (!verificationToken) {
      return res.status(400).json({success:false, message: "invalid link" });
    }
  
    user.isVerified = true;
    await user.save();
  
    await Tokens.findOneAndDelete({user:req.params.userId});
    res.status(200).json({ success:true, message: "Maitenant Votre compte est verifié" });
  }
   

export default {
    registerStudent,
    LoginUser,
    verifyUserAccountCtrl  
};