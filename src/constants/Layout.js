import { Image } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import { Circle, G, Path, Rect, Defs, ClipPath, LinearGradient, Stop } from 'react-native-svg'
import { Images } from './Images'
const { width, height } = Dimensions.get('window')
/**
 * Global variable
 */
export const LAYOUT = {
	window: { width, height },
	RightIcon: <G width="25" height="24" viewBox="0 0 25 24" fill="none">
		<Path d="M10.5 18L16.5 12L10.5 6" stroke="white" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round" />
	</G>,
	InicioIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#F2F2F2" stroke="#474A57" strokeWidth="2" />
	</G>,
	InicioActiveIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#F2994A" stroke="#18191F" strokeWidth="2" />
	</G>,
	DescubreIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path d="M12.9052 1.57507C12.7405 1.2241 12.3877 1 12 1C11.6123 1 11.2595 1.2241 11.0948 1.57507L8.23127 7.67512L1.84809 8.65619C1.47772 8.71311 1.17026 8.97232 1.05153 9.32772C0.932796 9.68313 1.02272 10.0751 1.2845 10.3432L5.93176 15.1029L4.83304 21.839C4.77139 22.217 4.93103 22.597 5.24413 22.8175C5.55722 23.0381 5.96878 23.0604 6.30392 22.8751L12 19.7253L17.6961 22.8751C18.0312 23.0604 18.4428 23.0381 18.7559 22.8175C19.069 22.597 19.2286 22.217 19.167 21.839L18.0682 15.1029L22.7155 10.3432C22.9773 10.0751 23.0672 9.68313 22.9485 9.32772C22.8297 8.97232 22.5223 8.71311 22.1519 8.65619L15.7687 7.67512L12.9052 1.57507Z" fill="#E0E0E0" stroke="#474A57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	DescubreActiveIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path d="M12.9052 1.57507C12.7405 1.2241 12.3877 1 12 1C11.6123 1 11.2595 1.2241 11.0948 1.57507L8.23127 7.67512L1.84809 8.65619C1.47772 8.71311 1.17026 8.97232 1.05153 9.32772C0.932796 9.68313 1.02272 10.0751 1.2845 10.3432L5.93176 15.1029L4.83304 21.839C4.77139 22.217 4.93103 22.597 5.24413 22.8175C5.55722 23.0381 5.96878 23.0604 6.30392 22.8751L12 19.7253L17.6961 22.8751C18.0312 23.0604 18.4428 23.0381 18.7559 22.8175C19.069 22.597 19.2286 22.217 19.167 21.839L18.0682 15.1029L22.7155 10.3432C22.9773 10.0751 23.0672 9.68313 22.9485 9.32772C22.8297 8.97232 22.5223 8.71311 22.1519 8.65619L15.7687 7.67512L12.9052 1.57507Z" fill="#F2C94C" stroke="#474A57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	ChatIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<G clip-path="url(#clip0)">
			<Path d="M-2.72243 26.5L12 0.999999L26.7224 26.5H-2.72243Z" fill="#C4C4C4" stroke="black" />
		</G>
		<Defs>
			<ClipPath id="clip0">
				<Rect width="24" height="24" fill="white" />
			</ClipPath>
		</Defs>
	</G>,
	ChatActiveIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<G clip-path="url(#clip0)">
			<Path d="M-2.72243 26.5L12 0.999999L26.7224 26.5H-2.72243Z" fill="#FFBD12" stroke="black" />
		</G>
		<Defs>
			<ClipPath id="clip0">
				<Rect width="24" height="24" fill="white" />
			</ClipPath>
		</Defs>
	</G>,
	BlogIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect x="1" y="1" width="22" height="22" rx="7" fill="#E0E0E0" stroke="#474A57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	BlogActiveIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Rect x="1" y="1" width="22" height="22" rx="7" fill="#E02354" stroke="#474A57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	PerfilIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#F2F2F2" stroke="#474A57" strokeWidth="2" />
	</G>,
	PerfilActiveIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#18DFB1" stroke="#474A57" strokeWidth="2" />
	</G>,
	PerfilIcon1: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#375FEE" stroke="#18191F" strokeWidth="2" />
	</G>,
	PerfilIcon2: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#18DFB1" stroke="#18191F" strokeWidth="2" />
	</G>,
	PerfilIcon3: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#FF9692" stroke="#18191F" strokeWidth="2" />
	</G>,
	PerfilIcon4: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#FFBD12" stroke="#18191F" strokeWidth="2" />
	</G>,
	PerfilIcon5: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Circle cx="12" cy="12" r="11" fill="#E43434" stroke="#18191F" strokeWidth="2" />
	</G>,
	Cicon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C14.7924 19 17.2029 17.3649 18.3264 15H21H22.5859C21.2801 19.617 17.0351 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C17.0351 1 21.2801 4.38299 22.5859 9H21H18.3264C17.2029 6.63505 14.7924 5 12 5Z" fill="url(#paint0_linear)" />
		<Defs>
			<LinearGradient id="paint0_linear" x1="16.6498" y1="1" x2="11.6142" y2="22.959" gradientUnits="userSpaceOnUse">
				<Stop stopColor="#9ECBFF" />
				<Stop offset="0.411458" stopColor="#6FA0FF" />
				<Stop offset="1" stopColor="#AF93FF" />
			</LinearGradient>
		</Defs>
	</G>
	,
	VoiceIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<Path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1V1Z" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<Path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<Path d="M12 19V23" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<Path d="M8 23H16" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	SendIcon: <G width="24" height="24" viewBox="0 0 24 24" fill="none">
		<G clip-path="url(#clip0)">
			<Path d="M21.284 12.0008H5.72768" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<Path d="M21.2842 12.0015L2.19234 21.1939L5.72788 12.0015L2.19234 2.80912L21.2842 12.0015Z" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</G>
		<Defs>
			<ClipPath id="clip0">
				<Rect width="24" height="24" fill="white" />
			</ClipPath>
		</Defs>
	</G>,
	ShowpasswordIcon:
		<G width="22" height="16" viewBox="0 0 22 16" fill="none" >
			<Path d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z" fill="#D4D4D4" />
		</G>
	,
	CreditCard: <G width="25" height="17" viewBox="0 0 25 17" fill="none">
		<Path fill-rule="evenodd" clip-rule="evenodd" d="M0.82698 2.13803C0.645452 2.4943 0.564702 2.9117 0.528781 3.50004H24.4712C24.4353 2.9117 24.3545 2.4943 24.173 2.13803C23.8854 1.57354 23.4265 1.1146 22.862 0.82698C22.2202 0.5 21.3802 0.5 19.7 0.5H5.3C3.61984 0.5 2.77976 0.5 2.13803 0.82698C1.57354 1.1146 1.1146 1.57354 0.82698 2.13803ZM24.5 6.50004H0.5V11.7C0.5 13.3802 0.5 14.2202 0.82698 14.862C1.1146 15.4265 1.57354 15.8854 2.13803 16.173C2.77976 16.5 3.61984 16.5 5.3 16.5H19.7C21.3802 16.5 22.2202 16.5 22.862 16.173C23.4265 15.8854 23.8854 15.4265 24.173 14.862C24.5 14.2202 24.5 13.3802 24.5 11.7V6.50004ZM2.5 12.5H8.5V14.5H2.5V12.5Z" fill="white" />
	</G>,
	CardIcon: <G width="28" height="23" viewBox="0 0 28 23" fill="none">
		<Path fill-rule="evenodd" clip-rule="evenodd" d="M6.35003 0.5H6.31771C5.45253 0.499993 4.75757 0.499987 4.1954 0.545918C3.61749 0.593135 3.1142 0.692604 2.64992 0.929164C1.90903 1.30667 1.30667 1.90903 0.929164 2.64992C0.692604 3.1142 0.593135 3.61749 0.545919 4.1954C0.499988 4.75756 0.499993 5.45253 0.5 6.31771V6.31771V6.35002V6.5C0.5 6.91421 0.835787 7.25 1.25 7.25C1.66421 7.25 2 6.91421 2 6.5V6.35002C2 5.44506 2.00058 4.81144 2.04094 4.31754C2.08057 3.8324 2.15481 3.54848 2.26567 3.33091C2.49937 2.87226 2.87226 2.49937 3.33091 2.26567C3.54848 2.15481 3.8324 2.08057 4.31755 2.04094C4.81144 2.00058 5.44506 2 6.35003 2H7.75C8.16421 2 8.5 1.66421 8.5 1.25C8.5 0.835787 8.16421 0.5 7.75 0.5H6.35003ZM22.15 2C23.0549 2 23.6886 2.00058 24.1825 2.04094C24.6676 2.08057 24.9515 2.15481 25.1691 2.26567C25.6277 2.49937 26.0006 2.87226 26.2343 3.33091C26.3452 3.54848 26.4194 3.8324 26.4591 4.31754C26.4994 4.81144 26.5 5.44506 26.5 6.35002V6.5C26.5 6.91421 26.8358 7.25 27.25 7.25C27.6642 7.25 28 6.91421 28 6.5V6.35002V6.31769C28 5.45252 28 4.75756 27.9541 4.1954C27.9069 3.61749 27.8074 3.1142 27.5708 2.64992C27.1933 1.90903 26.591 1.30667 25.8501 0.929164C25.3858 0.692604 24.8825 0.593135 24.3046 0.545918C23.7424 0.499987 23.0475 0.499993 22.1823 0.5H22.15H20.75C20.3358 0.5 20 0.835787 20 1.25C20 1.66421 20.3358 2 20.75 2H22.15ZM2 17C2 16.5858 1.66421 16.25 1.25 16.25C0.835787 16.25 0.5 16.5858 0.5 17V17.15V17.1823C0.499993 18.0475 0.499988 18.7424 0.545919 19.3046C0.593135 19.8825 0.692604 20.3858 0.929164 20.8501C1.30667 21.591 1.90903 22.1933 2.64992 22.5708C3.11419 22.8074 3.61749 22.9069 4.1954 22.9541C4.75756 23 5.45252 23 6.31769 23H6.35003H7.75C8.16421 23 8.5 22.6642 8.5 22.25C8.5 21.8358 8.16421 21.5 7.75 21.5H6.35003C5.44506 21.5 4.81144 21.4994 4.31755 21.4591C3.8324 21.4194 3.54848 21.3452 3.33091 21.2343C2.87226 21.0006 2.49937 20.6277 2.26567 20.1691C2.15481 19.9515 2.08057 19.6676 2.04094 19.1825C2.00058 18.6886 2 18.0549 2 17.15V17ZM28 17C28 16.5858 27.6642 16.25 27.25 16.25C26.8358 16.25 26.5 16.5858 26.5 17V17.15C26.5 18.0549 26.4994 18.6886 26.4591 19.1825C26.4194 19.6676 26.3452 19.9515 26.2343 20.1691C26.0006 20.6277 25.6277 21.0006 25.1691 21.2343C24.9515 21.3452 24.6676 21.4194 24.1825 21.4591C23.6886 21.4994 23.0549 21.5 22.15 21.5H20.75C20.3358 21.5 20 21.8358 20 22.25C20 22.6642 20.3358 23 20.75 23H22.15H22.1823C23.0475 23 23.7424 23 24.3046 22.9541C24.8825 22.9069 25.3858 22.8074 25.8501 22.5708C26.591 22.1933 27.1933 21.591 27.5708 20.8501C27.8074 20.3858 27.9069 19.8825 27.9541 19.3046C28 18.7424 28 18.0475 28 17.1823V17.15V17ZM5.27159 8C5.29853 7.55876 5.35909 7.24572 5.49524 6.97852C5.71095 6.55516 6.05516 6.21095 6.47852 5.99524C6.95982 5.75 7.58988 5.75 8.85 5.75H19.65C20.9101 5.75 21.5402 5.75 22.0215 5.99524C22.4448 6.21095 22.789 6.55516 23.0048 6.97852C23.1409 7.24572 23.2015 7.55876 23.2284 8H5.27159ZM5.25 10.25H23.25V14.15C23.25 15.4101 23.25 16.0402 23.0048 16.5215C22.789 16.9448 22.4448 17.289 22.0215 17.5048C21.5402 17.75 20.9101 17.75 19.65 17.75H8.85C7.58988 17.75 6.95982 17.75 6.47852 17.5048C6.05516 17.289 5.71095 16.9448 5.49524 16.5215C5.25 16.0402 5.25 15.4101 5.25 14.15V10.25ZM11.25 14.75H6.75V16.25H11.25V14.75Z" fill="#929DA9" />
	</G>,
	PaymentLockIcon: <G width="17" height="21" viewBox="0 0 17 21" fill="none">
		<Path fill-rule="evenodd" clip-rule="evenodd" d="M1.29838 19.6196C3.28715 20.4844 5.78537 21 8.5 21C11.2146 21 13.7129 20.4844 15.7016 19.6196C16.1839 19.4099 16.5 18.9342 16.5 18.4027V10.4637C16.5 9.93226 16.1839 9.45657 15.7016 9.24686C15.3698 9.10258 15.019 8.97197 14.6602 8.8479V6.23739C14.6602 2.79809 11.8967 0 8.49998 0C5.10324 0 2.33976 2.79809 2.33976 6.23739V8.84792C1.98096 8.97199 1.6302 9.10258 1.29838 9.24686C0.816075 9.45657 0.5 9.93226 0.5 10.4637V18.4027C0.5 18.9342 0.816075 19.4099 1.29838 19.6196ZM9.72843 14.6524V16.6142C9.72843 17.3011 9.17845 17.858 8.5 17.858C7.82155 17.858 7.27155 17.3011 7.27155 16.6142V14.6524C6.79676 14.2801 6.48983 13.6989 6.48983 13.0438C6.48983 11.9197 7.38981 11.0085 8.5 11.0085C9.61019 11.0085 10.5102 11.9197 10.5102 13.0438C10.5102 13.6989 10.2032 14.2801 9.72843 14.6524ZM8.49998 2.63689C6.53915 2.63689 4.94403 4.25212 4.94403 6.23739V8.17856C6.06666 7.97891 7.25888 7.86646 8.5 7.86646C9.7411 7.86646 10.9333 7.97891 12.0559 8.17856V6.23739C12.0559 4.25212 10.4608 2.63689 8.49998 2.63689Z" fill="white" />
	</G>,
	InstagramIcon: <G width="36" height="36" viewBox="0 0 36 36" fill="none">
		<Path d="M25.5 3H10.5C6.35786 3 3 6.35786 3 10.5V25.5C3 29.6421 6.35786 33 10.5 33H25.5C29.6421 33 33 29.6421 33 25.5V10.5C33 6.35786 29.6421 3 25.5 3Z" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<Path d="M24 17.0551C24.1852 18.3035 23.9719 19.5784 23.3907 20.6986C22.8094 21.8188 21.8898 22.7272 20.7625 23.2946C19.6352 23.862 18.3577 24.0595 17.1117 23.859C15.8657 23.6585 14.7147 23.0702 13.8223 22.1778C12.9299 21.2854 12.3416 20.1344 12.1412 18.8884C11.9407 17.6424 12.1381 16.3649 12.7055 15.2376C13.2729 14.1104 14.1813 13.1907 15.3015 12.6094C16.4217 12.0282 17.6967 11.815 18.945 12.0001C20.2184 12.1889 21.3973 12.7823 22.3076 13.6925C23.2179 14.6028 23.8112 15.7817 24 17.0551Z" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		<Path d="M26.25 9.75H26.265" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	TwiterIcon: <G width="36" height="36" viewBox="0 0 36 36" fill="none">
		<Path d="M34.5 4.50007C33.0636 5.51328 31.4732 6.28823 29.79 6.79507C28.8866 5.75634 27.686 5.02011 26.3506 4.68596C25.0151 4.35181 23.6092 4.43586 22.3231 4.92675C21.037 5.41764 19.9327 6.29167 19.1595 7.43064C18.3863 8.56962 17.9815 9.91857 18 11.2951V12.7951C15.364 12.8634 12.7519 12.2788 10.3965 11.0932C8.04112 9.90769 6 8.25 4.5 6.00007C4.5 6.00007 -1.5 19.5001 12 25.5001C8.91079 27.597 5.23074 28.6485 1.5 28.5001C15 36.0001 31.5 28.5001 31.5 11.2501C31.4986 10.8322 31.4584 10.4155 31.38 10.0051C32.9109 8.49531 33.9912 6.58914 34.5 4.50007Z" stroke="#18191F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</G>,
	StripePublicKey: "pk_test_51JJ4yML46jblOkAWYCHHyAMBK1B8r6XWJmRETaeM7Iq5B2O4Is03MFImD70DdVm5lxF78rpWfrshZPiCFNvKk0RE00LBeIjysD",//test
	// StripePublicKey: "pk_live_51JJ4yML46jblOkAWQlDQ09As8ix7pKp0PVf9a6ZcHfSQZaexuXcfqIdJO0xIaLCrOcnAL252hKuaL85qnF1NlMUN00PQIgvgSB",//live key
	adminInfo: {
		email: "atomictasks@gmail.com",
		name: "Atomic Task",
	},
	DrawerList: [
		{ navLink: "HomeScreen", title: "Home" },
		{ navLink: "PerfilScreen", title: "Perfil" },
		{ navLink: "DescubreScreen", title: "Descubre" },
		{ navLink: "BlogScreen", title: "Blog" },
		{ navLink: "ChatScreen", title: "Chat" },
		{ navLink: "AlarmsScreen", title: "Alarmas" },		
		{ navLink: "ValorarScreen", title: "Desafíos" },
	],
	CardInfo: {
		product: [
			{ img: <Image w="80%" source={Images.DescubreList1} resizeMode="contain" alignSelf="center" my={5} />, Text: "Deja el el movil en un lugar comodo y aprende ingles", buttonText: "Estudiar", CardImg: <Image source={Images.DescubreList1} resizeMode="contain" mt={-3} /> },
			{ img: <Image w="80%" source={Images.DescubreList2} resizeMode="contain" alignSelf="center" my={10} />, Text: "Deberas mandar un link del stream/video", buttonText: "Hacer stream", CardImg: <Image source={Images.DescubreList2} resizeMode="contain" my={3} /> },
			{ img: <Image w="80%" source={Images.DescubreList3} resizeMode="contain" alignSelf="center" />, Text: "Deberas mandar una foto del diseño  hecho", buttonText: "Crear diseño", CardImg: <Image source={Images.HomeImage2} resizeMode="contain" my={-8} /> },
		],
		Salud: [
			{ img: <Image w="80%" source={Images.HomeImage1} resizeMode="contain" alignSelf="center" mt={10} mb={5} />, Text: "Deberas mandar una foto cada semana pesandote en la balanza si la tienes o un selfie", buttonText: "Bajar peso", CardImg: <Image source={Images.HomeImage1} resizeMode="contain" my={5} /> },
			{ img: <Image w="80%" source={Images.SaludImage1} resizeMode="contain" alignSelf="center" mb={-3} />, Text: "Deberas mandar una selfie antes y despues de cada practica de deporte sea el gimnasio o solo correr", buttonText: "Práctica deporte", CardImg: <Image source={Images.SaludImage1} resizeMode="contain" mt={-5} /> },
		],
		Crecimi: [
			{ img: <Image w="80%" source={Images.CrecimientoImage2} resizeMode="contain" alignSelf="center" mb={-20} />, Text: "Eso que estabas postergando por miedo o nervios piensa en un nuevo proyecto  y informanos", buttonText: "Aprender nueva habilidad", CardImg: <Image source={Images.CrecimientoImage2} resizeMode="contain" mb={-10} /> },
			{ img: <Image w="80%" source={Images.CrecimientoImage4} resizeMode="contain" alignSelf="center" mb={-20} />, Text: "Elige una nueva habilidad que quieras aprender y vas informandonos cada semana", buttonText: "Empezar un nuevo proyecto", CardImg: <Image source={Images.CrecimientoImage4} resizeMode="contain" mb={-10} /> },
		]
	}

}