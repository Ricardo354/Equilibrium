import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      
      try {
        const resId = await axios.get("http://localhost:3000/api/check-auth", {
          withCredentials: true,
          });

          if (resId.data.isLoggedIn) {
              const userId = resId.data.user.id;
              const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
              setUser(response.data);      
          } else {
              navigate('/login');
          }

       
      } catch (err) {
        setError('Erro ao carregar os dados');
      }
    };

    carregarDadosUsuario();
  });

  const handleEditClick = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='bg-desktop-bg h-screen flex items-center justify-center'>
      {user && (
        <div className="loginContainer text-center border-1 bg-brand-white text-black rounded-2xl font-dmSans font-light shadow-2xl lg:w-full lg:max-w-md">
          <div>
            <h1 className="font-extrabold text-2xl p-4">Perfil do usuário</h1>
            <p className="pb-4">Essa página infoma dados sobre o usuário.</p>
            <hr />
          </div>

          {edit ? (
            <form>
              <div className="my-2">
                <label className="font-bold text-desktop-bg mr-2">Nome:</label>
                <input
                  className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                  type="text"
                  name="nome"
                  value={editedUser.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2">
                <label className="font-bold text-desktop-bg mr-2">Email:</label>
                <input
                  className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              </div>

              <div className="my-2 px-28">
                <label className="font-bold text-desktop-bg mr-1">Tipo:</label>
                  {user.tipo}
              </div>

            </form>
        ) : (
          
          
          <div>
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Nome:</span> {user.nome}</p>

            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Email:</span> {user.email}</p>
            
            <hr />
            <p className="p-4"><span className="font-bold text-desktop-bg">Tipo:</span> {user.tipo}</p>
            <hr />
          </div>
          )}

          
          {user.tipo === 'PACIENTE' && user.Paciente && (
            edit ? (
              <form>
                <div className="mb-4">
                  <label className="font-bold text-desktop-bg mr-2">Idade:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="number"
                    name="idade"
                    value={editedUser.Paciente?.idade}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Gênero:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="genero"
                    value={editedUser.Paciente?.genero}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Queixas:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="queixas"
                    value={editedUser.Paciente?.queixas}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Histórico Familiar:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="historico_familiar"
                    value={editedUser.Paciente?.historico_familiar}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Uso de Medicamentos:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="uso_medicamentos"
                    value={editedUser.Paciente?.uso_medicamentos}
                    onChange={handleChange}
                  />
                </div>

                <div className="my-4">
                  <label className="font-bold text-desktop-bg mr-2">Objetivo Terapia:</label>
                  <input
                    className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                    type="text"
                    name="objetivo_terapia"
                    value={editedUser.Paciente?.objetivo_terapia}
                    onChange={handleChange}
                  />
                </div>
              </form>
            ) : (
            
            <div className="mt-4">
              <h2 className="font-bold">Dados de Paciente</h2>
              <p className="p-4"><span className="font-bold text-desktop-bg">Idade:</span>{user.Paciente.idade}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Gênero:</span> {user.Paciente.genero}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Queixas:</span> {user.Paciente.queixas}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Histórico Familiar:</span> {user.Paciente.historico_familiar}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Uso de Medicamentos:</span> {user.Paciente.uso_medicamentos}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Objetivo Terapia:</span> {user.Paciente.objetivo_terapia}</p>
            </div>
            )
          )}  

    
          {user.tipo === 'PROFISSIONAL' && user.Profissional && (
          edit ? (
            <form>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}
                  
                  <div className="my-2">
                    <label className="font-bold text-desktop-bg mr-2">Especialidade:</label>
                    <input
                      className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                      type="text"
                      name="especialidade"
                      value={editedUser.Profissional?.especialidade}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <div className="my-2">
                    <label className="font-bold text-desktop-bg mr-2">Localização:</label>
                    <input
                      className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                      type="text"
                      name="localizacao"
                      value={editedUser.Profissional?.localizacao}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="my-2">
                    <label className="font-bold text-desktop-bg mr-2">Faixa Etária de Atendimento:</label>
                    <input
                      className="bg-brand-beige border-2 border-desktop-bg rounded-md focus:outline-none"
                      type="number"
                      name="faixa_etaria"
                      value={editedUser.Profissional?.faixa_etaria}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="my-2">
                    <label className="font-bold text-desktop-bg mr-2">Atendimentos Gratuitos:</label>
                    <input
                      className="accent-desktop-bg "
                      type="checkbox"
                      name="atendimentos_gratuitos"
                      value={editedUser.Profissional?.atendimentos_gratuitos}
                      onChange={handleChange}
                    />
                  </div>
            </form>
            ) : (
          

            <div className="mt-4">
              <h2 className="font-bold" >Dados de Profissional</h2>
              {user.Profissional.foto && <img src={user.Profissional.foto} alt="Foto do profissional" className="mt-4 w-32 h-32 rounded-full mx-auto" />}

              <p className="p-4"><span className="font-bold text-desktop-bg">Especialidade:</span> {user.Profissional.especialidade}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Localização:</span> {user.Profissional.localizacao}</p>

              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Faixa Etária de Atendimento:</span> {user.Profissional.faixa_etaria}</p>
              
              <hr />
              <p className="p-4"><span className="font-bold text-desktop-bg">Atendimentos Gratuitos:</span> {user.Profissional.atendimentos_gratuitos ? 'Sim' : 'Não'}</p>
            </div>
          ))}

          <Link to="/">
            <button className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
               Home
            </button>
          </Link>

          <button
            onClick={handleEditClick}
            className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
            {edit ? 'Salvar' : 'Editar'}
          </button>

          {edit && (
          <button
            onClick={() => setEdit(false)}
            className="border-2 border-desktop-bg px-6 py-2 m-2 rounded-full hover:bg-desktop-bg hover:text-brand-white transition">
            Cancelar
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;