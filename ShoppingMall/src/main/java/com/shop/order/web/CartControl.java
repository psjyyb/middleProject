package com.shop.order.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.shop.common.Control;

public class CartControl implements Control {

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		String userId = (String) session.getAttribute("logId");

		req.setAttribute("userId", userId);
		
		String path = "/order/cart.tiles";
		req.getRequestDispatcher(path).forward(req, resp);
		

	}

}
