import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext"

export default function ProtectedRoute({children, requireAdmin}){
            //로그인한 사용자가 있는지 확인
            //그 사용자가 어드민권한이 있는지 확인
            //requireAdmin이 true인 경우에는 로그인도 되어있어야하고 어드민 권한도 가지고 있어야한다
            //조건에 맞지 않으면 상위 경로로 이동 
            //조건에 맞는 경우에만 전달된 children을 보여줌 (해당 페이지 컴포넌트)

    const {user} = useAuthContext();

    if(!user||(requireAdmin && !user.isAdmin)){ //로그인이 안되어있거나 로그인은 되었는데 어드민이 필요 + 유저의 어드민이 false이면
        return <Navigate to="/" replace={true}></Navigate>
    }

    return children
}