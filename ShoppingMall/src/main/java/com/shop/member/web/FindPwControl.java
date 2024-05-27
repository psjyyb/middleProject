package com.shop.member.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shop.common.Control;
import com.shop.member.service.MemberService;
import com.shop.member.service.MemberServiceImpl;
import com.shop.vo.MemberVO;

public class FindPwControl implements Control{

	@Override
	public void exec(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
	
		MemberService svc = new MemberServiceImpl();
		
		MemberVO mvo = new MemberVO();
		mvo.setUserId(id);
		mvo.setUserName(name);
		mvo.setUserPhone(phone);
		String find = svc.FindPw(mvo);
		
		req.setAttribute("find",find );
		String path = "login/FindPwResultForm.tiles";
		req.getRequestDispatcher(path).forward(req, resp);	
	}

}
