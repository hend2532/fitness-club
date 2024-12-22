import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ProtectedRoute للتحقق من صلاحية المستخدم للوصول للصفحة
function ProtectedRoute({children} ) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user.role: ", user?.role); // استخدام optional chaining للتحقق من وجود user

  // إذا لم يكن المستخدم مسجلاً دخولًا أو لا يملك الصلاحية
  if (!isAuthenticated || user?.role !== "admin") {
    // إعادة التوجيه إلى صفحة مختلفة أو عرض رسالة
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;
