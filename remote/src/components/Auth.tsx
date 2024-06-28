import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './auth.service';
import Swal from 'sweetalert2';
import { Company } from '../interfaces/company';

const AuthComponent: React.FC = () => {
    const [usr, setUsr] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [noAuth, setNoAuth] = useState<string>('');
    const [companies, setCompanies] = useState<Company[]>([]);
    const [companyName, setCompanyName] = useState<string>('Seleccione Clinica');
    const [accessButton, setAccessButton] = useState<string>('Acceder');
    const [multiLoginValue, setMultiLoginValue] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    }, [navigate]);

    const newChange = () => {
        setAccessButton('Cargando');
        if (usr !== '' && pwd !== '') {
            setIsLoading(true);
            loginPreToken();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios',
            });
        }
    };

    const multiLogin = (companies: Company[]) => {
        if (companies.length > 1) {
            setMultiLoginValue(false);
        } else {
            login(companies[0].name);
        }
    };

    const loginPreToken = () => {
        AuthService.getPreToken(usr, pwd)
            .then((value) => {
                setCompanies(value.user.company);
                multiLogin(value.user.company);
                localStorage.setItem('pre_token', value.token);
                localStorage.setItem('username', value.user.username);
                localStorage.setItem('usr', JSON.stringify(value.user));
                localStorage.setItem('haveViewerAccess', value.user.haveViewerAccess.toString());
                localStorage.setItem('canCancelStudyToBurn', value.user.canCancelStudyToBurn.toString());
                localStorage.setItem('company', JSON.stringify(value.user.company));
            })
            .catch((err) => {
                setIsLoading(false);
                setNoAuth('Acceso Denegado, Credenciales Invalidas.');
            });
    };

    const login = (companyName: string) => {
        let rif: string | undefined;
        setCompanyName(companyName);
        companies.forEach((company) => {
            if (company.name === companyName) {
                rif = company.rif;
            }
        });
        if (rif) {
            AuthService.getToken(usr, pwd, rif)
                .then((value) => {
                    localStorage.setItem('token', value.token);
                })
                .finally(() => {
                    if (usr === localStorage.getItem('username') && localStorage.getItem('token')) {
                        setIsLoading(false);
                        navigate('/home');
                    }
                });
        }
    };

    return (
        <section className="min-vh-100" style={{ backgroundColor: '#5c7a90' }}>
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem', backgroundColor: '#dee2e6' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="../../../assets/img/tommo.png"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <img src="../../../assets/img/logo.png" id="icon" alt="User Icon" />
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                Inicio de sesión
                                            </h5>
                                            <div className="form-outline mb-4">
                                                <span className="d-block">Username:</span>
                                                <input
                                                    style={{ marginLeft: '0 !important' }}
                                                    type="text"
                                                    id="login"
                                                    className="form-control form-control-lg"
                                                    name="login"
                                                    value={usr}
                                                    onChange={(e) => setUsr(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <span className="d-block">Password:</span>
                                                <input
                                                    style={{ marginLeft: '0 !important' }}
                                                    type="password"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                    name="login"
                                                    value={pwd}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                />
                                            </div>
                                            <div className="btn-group" style={{ marginBottom: '15px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-info dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {companyName}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {companies.map((company) => (
                                                        <li key={company.rif}>
                                                            <a className="dropdown-item" onClick={() => login(company.name)}>
                                                                {company.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="button" type="button" onClick={newChange}>
                                                    <div className={isLoading ? 'spinner-border text-center' : ''} role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    {accessButton}
                                                </button>
                                            </div>
                                        </form>
                                        <p className="text-danger">{noAuth}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer2">
                <p>Gestor Automatizado para Radiologia</p>
                <p>© Copyright 2021-2022. All rights reserved. Developed by ti-connect.</p>
            </footer>
        </section>
    );
};

export default AuthComponent;
