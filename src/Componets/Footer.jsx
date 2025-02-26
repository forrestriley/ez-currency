import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

export function Footer(){
  return (
    <>
  <footer class="py-3 my-4 bg-light">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-body-secondary footText">Home</a></li>
      <li class="nav-item"><a href="https://github.com/forrestriley" class="nav-link px-2 text-body-secondary footText">GitHub</a></li>
      <li class="nav-item"><a href="https://www.linkedin.com/in/forrestriley/" class="nav-link px-2 text-body-secondary footText">Linkedin</a></li>
    </ul>
    <p class="text-center text-body-secondary">EZ-Currencey</p>
  </footer>
    </>
  )
}