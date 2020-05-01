import React, {useState, useEffect} from 'react'
import './Login.css'
import $ from 'jquery';
import API from '../../API'

const Login = (props) => {

    const [count, setCount] = useState(props.init);
    const [user,setUser] = useState('rickCast')
    const [password,setPassword] = useState('test1234')
    const [email,setEmail] = useState('ricardo@mdh.com')
    const [first_name,setFirstName] = useState('Richard')

    function handleChange(){
        setCount(count + 5);
    }
    async function getJobs(){
        const response = await API.getJobs()
        console.log(response);
    }

    async function startLogin(e){
        e.preventDefault();
        const response = API.login({
            username: user,
            password: password
        })
        console.log(response)
    }

    async function register(e){
        e.preventDefault();
        const response = API.register({
            username: user,
            password: password,
            email: email,
            first_name: first_name
        })
        console.log(response)
    }

    function mainJs(){
        console.log("Initializing jquery...");
        $('.toggle').click(function(){
    
            $('#resetpass').css('display','none');
            
            if($('#sesion').css('display') == 'none' && $('#registro').css('display') == 'block' && 
               $('#resetpass').css('display') == 'none')
            {
              
                $('#recuperacion').css('display','none');
                $('#resetpass').css('display','block');
                
                $('.formulario').animate({
                height: "toggle",
                'padding-top': 'toggle',
                'padding-bottom': 'toggle',
                opacity: 'toggle'
            }, "slow");
            }
            
            else if($('#registro').css('display') == 'none' &&
            $('#sesion').css('display') == 'none' &&
            $('#recuperacion').css('display') == 'block')
            {
                $('#sesion').css('display','block');
                
                $('#resetpass').css('display','none');
                $('#recuperacion').css('display','none');
             
                $('.formulario').animate({
                height: "toggle",
                'padding-top': 'toggle',
                'padding-bottom': 'toggle',
                opacity: 'toggle'
            }, "slow");
                    
            }
            else {
                $('.formulario').animate({
                height: "toggle",
                'padding-top': 'toggle',
                'padding-bottom': 'toggle',
                opacity: 'toggle'
            }, "slow");
            }
            
        });
        
        $('.toggle').click(function(){
            $("#recuperacion").css("display", "none");
            var el = $(this);
            if (el.text() == el.data("text-swap")) {
            el.text(el.data("text-original"));
            } else {
            $(".toggle").css("display", "block");
            el.data("text-original", el.text());
            el.text(el.data("text-swap"));
            }
        });
        
        /* -------------------------- */
        
        $('.reset-password').click(function() {
            $('.formulario').animate({
                height: "toggle",
                'padding-top': 'toggle',
                'padding-bottom': 'toggle',
                opacity: 'toggle'
            }, "slow");
        });
        
        $('.reset-password').click(function() {
            $("#registro").css("display", "none");
            var el = $(this);
            if (el.text() == el.data("text-swap")) {
            el.text(el.data("text-original"));
            } else {
            el.data("text-original", el.text());
            el.text(el.data("text-swap"));
            }
        });
    }


    useEffect(mainJs); // Didmount equivalent 
    
    return (
        <div>
            <div className="contenedor-form">
                {count}
                <div className="toggle" data-text-swap="Regresar">
                    <span> Crear Cuenta</span>
                </div>
                
                <div className="formulario" id="sesion">
                    <h2>Iniciar Sesión</h2>
                    <form action="#">
                        <input type="text" onChange={(e) => {setUser(e.target.value)}} placeholder="Usuario" value={user} required />
                        <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Contraseña" value={password} required />
                        <input type="submit" onClick={startLogin} value="Iniciar Sesión" />
                    </form>
                </div>
                
                <div className="formulario" id="registro">
                    <h2>Crea tu cuenta</h2>
                    <form action="#">
                        <input type="text" placeholder="Usuario" onChange={(e) => {setUser(e.target.value)}} required value={user}/>
                        <input type="email" placeholder="Correo Electronico" onChange={(e) => {setEmail(e.target.value)}} required value={email} />
                        <input type="password" placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value)}} required value={password} />
                        <input type="text" placeholder="Nombre" onChange={(e) => {setFirstName(e.target.value)}} required value={first_name} />
                        <input type="submit" value="Registrarse" onClick={register} />
                    </form>
                </div>
                
                <div className="formulario" id="recuperacion">
                    <h2>Restablecer contraseña</h2>
                    <h3>Ingresa tu correo electronico para restablecer tu contraseña.</h3>
                    <form action="#">
                        <input type="email" placeholder="Correo Electronico" required />
                        <input type="submit" value="Enviar" />
                    </form>
                </div>
                
                <div className="reset-password" data-text-swap="Regresar" id="resetpass">
                    <span><a href="#">Olvide mi contraseña?</a></span>
                </div>

                <button onClick={handleChange}>TEST</button>
                <button onClick={getJobs}>GETDATA</button>
                
            </div>
        </div>
    )
}

export default Login;