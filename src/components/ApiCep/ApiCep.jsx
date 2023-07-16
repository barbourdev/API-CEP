import { styled } from "styled-components";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./ApiCep.css";

const StyledApiCep = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};

    input {
      background: ${(props) => props.theme.backgroundColorInput};
      color: ${(props) => props.theme.textColorInput};
    }

    .button-cep {
      background: ${(props) => props.theme.backgroundColorInput};
      color: ${(props) => props.theme.textColorInput};
    }

    .button-cep:hover {
      background: ${(props) => props.theme.backgroundColorInputHover};
      color: ${(props) => props.theme.textColor};
    }
    
`;

export function ApiCep(props) {
    const [cep, setCep] = useState("");
    
    const handleCepChange = (event) => {
        setCep(event.target.value);
    };

    const formatarCep = (cep) => {
        if (cep && cep.length === 8) {
          return `${cep.substring(0, 5)}-${cep.substring(5)}`;
        }
        return cep;
      };
      
    const buscarDetalhesCEP = async () => {
        try {
            const cepResponse = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`
            );
            const cepData = cepResponse.data;
    
            // Verifique se o CEP é inválido com base na resposta da API
            if (cepData.erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cep inválido, tente novamente',
                    color: '#000',
                    confirmButtonColor: '#000',
                });

                document.getElementById("input-cep").value = "";
                setCep("")
            } else {
                Swal.fire({
                    icon: 'success',
                    title: `Cep: ${formatarCep(cep)}`,
                    text: `${cepData.logradouro}, ${cepData.bairro} - ${cepData.localidade} - ${cepData.uf}`,
                    color: '#000',
                    confirmButtonColor: '#000',
                });

                document.getElementById("input-cep").value = "";
                setCep("")
            }

        } catch (error) {
            
            Swal.fire({
                icon: 'error',
                title: 'Cep inválido, tente novamente',
                color: '#000',
                confirmButtonColor: '#000',
            });

            document.getElementById("input-cep").value = "";
            setCep("")
        }
    };

    const handleCepKeyDown = (event) => {
      if (event.key === "Enter") {
        buscarDetalhesCEP(cep)
      }
    };
      
      return (
        <StyledApiCep>
          <main className="main-react">
            <div className="icon-theme">{props.iconeToggle}</div>
            <section className="section-react">
              <div className="section-react-content">
                <label>Digite um Cep</label>
                <input
                  type="text"
                  id="input-cep"
                  placeholder="00000-000"
                  onKeyDown={handleCepKeyDown}
                  onChange={handleCepChange}
                  value={cep}
                />
                <button onClick={buscarDetalhesCEP} className="button-cep">Buscar Cep</button>
              </div>
            </section>
          </main>
        </StyledApiCep>
      );
}

