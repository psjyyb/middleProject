package com.shop.member.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shop.common.Control;

public class LoginForm implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String path = "WEB-INF/login/loginForm.tiles";
		path = "login/loginForm.tiles";
		req.getRequestDispatcher(path).forward(req, resp);
	}

}
